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
      bannedTime: '0',
    })
    req.session.user = { userId: user.id, userName: user.name, role: user.role, bannedTime: user.bannedTime }
    res.json({ userId: user.id, userName: user.name, role: user.role, bannedTime: user.bannedTime })
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
    req.session.user = { userId: user.id, userName: user.name, role: user.role, bannedTime: user.bannedTime };
    res.json({ userId: user.id, userName: user.name, role: user.role, bannedTime: user.bannedTime })
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

router.get('/check', async (req, res) => {
  if (req.session.user) {
    const { role, bannedTime }: UserModelType = await UserModel.findOne({ _id: req.session.user.userId }).lean();
    res.json({ ...req.session.user, role, bannedTime })
  }
});


router.post('/get/user', async (req, res) => {
  const { userId } = req.body
  const { role }: UserModelType = await UserModel.findOne({ _id: userId }).lean();
  res.json({ role })
});

router.post('/change/role', async (req, res) => {
  const { userId, roleChange } = req.body
  await UserModel.findByIdAndUpdate({ _id: userId }, { role: roleChange })
  const { role }: UserModelType = await UserModel.findOne({ _id: userId }).lean();
  res.json({ role })
});

export default router;
