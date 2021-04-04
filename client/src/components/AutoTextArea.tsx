import React, {
  useState,
  useEffect,
  useRef,
} from "react";

interface Props {
  text: string
}
export default function AutoTextArea({ text }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
  }, [text]);
  return (
    <textarea
      ref={textAreaRef}
      cols={175}
      style={{
        height: textAreaHeight,
      }}
      defaultValue={`${text}`}
      readOnly
    />
  )
}
