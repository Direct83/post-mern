import React, {
  useState,
  useEffect,
  useRef,
} from "react";

interface Props {
  text: string
}
const AutoTextArea = ({ text }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  console.log(document.querySelector<HTMLInputElement>('textarea'));

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);
  return (
    <textarea
      ref={textAreaRef}
      cols={175}
      style={{
        height: textAreaHeight,
        fontSize: '18px',
      }}
      defaultValue={`${text}`}
      readOnly
    />
  );
};

export default AutoTextArea;
