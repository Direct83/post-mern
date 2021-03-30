import bcrypt from 'bcrypt';
import express from 'express';
import { UserModel, UserModelType } from '../models/user.model.js';

const router = express.Router();

router.post('/signup', async (req: express.Request, res: express.Response) => {
  const { name, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: UserModelType = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    })
    req.session.user = { userId: user.id, userName: user.name, role: user.role }
    res.json({ userId: user.id, userName: user.name, role: user.role })
  } catch (error) {
    return res.json({ message: "что то пошло не так", error: error.message });
  }
});


router.post('/signin', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserModel.findOne({ name }).exec();
    if (!user) {
      return res.json({ message: 'Имени нет в базе, пожалуйста, пройдите регистрацию' })
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: 'не тот пароль' })
    }
    req.session.user = { userId: user.id, userName: user.name, role: user.role };
    res.json({ userId: user.id, userName: user.name, role: user.role })
  } catch (error) {
    return res.json({ message: "что то пошло не так", error: error.message });
  }
});

router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    return res.redirect('/');
  });
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json({ ...req.session.user })
  }
});

export default router;
