"use client";
import { useEffect, useState } from "react";
import classes from "./modal.module.css";
import { createPortal } from "react-dom";
import { getData } from "@/lib/handler";
import { useActionState } from "react";
export default function Modal() {
  const [isOpened, setIsOpened] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [data, actionHandler, isPedding] = useActionState(getData, null);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.story || data?.error) {
      setIsOpened(false);
    }
  }, [data]);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const irina = voices.find(
      (v) => v.name === "Microsoft Pavel - Russian (Russia)"
    )!;
    if (irina) {
      utterance.voice = irina;
    }
    utterance.lang = "ru-RU";
    utterance.rate = 1.0;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };
  const stopVoice = () => {
    window.speechSynthesis.cancel();
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <div className={isOpened ? classes.overlay : undefined}></div>
      <button onClick={() => setIsOpened(true)} className={classes.start}>
        <p>Начать</p>
      </button>

      <dialog open={isOpened} className={classes.dialog}>
        <button onClick={() => setIsOpened(false)}>❌</button>
        <form action={actionHandler}>
          <label>Кидай слова</label>
          <input
            type="text"
            placeholder="Типа: кот, ракета, джунгли"
            name="word"
            required
          />
          <label>Выбери вайб</label>
          <input
            type="text"
            placeholder="Например: хоррор, комедия, сказка"
            name="category"
            required
          />
          <button disabled={isPedding}>
            {isPedding ? "Ожидайте..." : "Погнали"}
          </button>
          {isPedding && <div className={classes.loader}></div>}
        </form>
      </dialog>
      {data?.story && (
        <>
          <div className={classes.story}>
            <h2>{data?.story.title}</h2>
            <p>{data?.story.content}</p>
          </div>
          <div className={classes.voice}>
            <button onClick={() => speakText(data?.story.content)}>
              Озвучить
            </button>
            <button
              onClick={stopVoice}
              style={{ background: "red", color: "white" }}
            >
              Стоп
            </button>
          </div>
        </>
      )}
      {data?.error && (
        <div className={classes.error}>
          <p>{data?.error}</p>
        </div>
      )}
    </>,
    document.getElementById("modal")!
  );
}
