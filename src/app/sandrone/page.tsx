"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./page.module.css";
import { CODES, PASSWORD } from "./secrets";
import { copyText } from "./clipboard";

export default function SandronePage() {
  const [value, setValue] = useState("");
  const unlockedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#fff";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  // Enter / "Google 검색" / "I'm Feeling Lucky" 모두 이 함수로 온다.
  // 잠금 상태: 비밀번호 검사. 해제 상태: 코드 → 클립보드 복사. 어느 경우든 입력만 비운다.
  const submit = () => {
    const input = value.trim();
    setValue("");
    if (input) {
      if (!unlockedRef.current) {
        if (input === PASSWORD) unlockedRef.current = true;
      } else if (Object.prototype.hasOwnProperty.call(CODES, input)) {
        copyText(CODES[input]);
      }
    }
    inputRef.current?.focus();
  };

  // <form> 대신 keydown 처리: hydration 전에 Enter를 눌러도 네이티브 submit(?q=…)이 일어나지 않게.
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    submit();
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <nav className={styles.topLeft}>
          <a href="#" onClick={(e) => e.preventDefault()}>정보</a>
          <a href="#" onClick={(e) => e.preventDefault()}>스토어</a>
        </nav>
        <nav className={styles.topRight}>
          <a href="#" onClick={(e) => e.preventDefault()}>Gmail</a>
          <a href="#" onClick={(e) => e.preventDefault()}>이미지</a>
          <button type="button" className={styles.appsBtn} aria-label="Google 앱">
            <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
              <path
                fill="#5f6368"
                d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
              />
            </svg>
          </button>
          <button type="button" className={styles.signIn}>로그인</button>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.logo}>
          <svg viewBox="0 0 272 92" width="272" height="92" aria-label="Google" role="img">
            <path
              fill="#EA4335"
              d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            />
            <path
              fill="#FBBC05"
              d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            />
            <path
              fill="#4285F4"
              d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
            />
            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
            <path
              fill="#EA4335"
              d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
            />
            <path
              fill="#4285F4"
              d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-17.02-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
            />
          </svg>
        </div>

        <div className={styles.form}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
                <path
                  fill="#9aa0a6"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
            </span>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="검색"
              autoFocus
            />
            <span className={styles.trailingIcons}>
              <button type="button" className={styles.iconBtn} aria-label="음성 검색">
                <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
                  <path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z" />
                  <path fill="#34a853" d="m11 18.08h2v3.92h-2z" />
                  <path fill="#fbbc05" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z" />
                  <path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z" />
                </svg>
              </button>
              <button type="button" className={styles.iconBtn} aria-label="이미지로 검색">
                <svg viewBox="0 0 192 192" width="24" height="24" focusable="false">
                  <circle fill="#34a853" cx="144.07" cy="144" r="16" />
                  <circle fill="#4285f4" cx="96.07" cy="104" r="24" />
                  <path fill="#ea4335" d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16H56.8c-9.27,0-16.8-7.52-16.8-16.8V96H24V135.2z" />
                  <path fill="#fbbc04" d="M56.8,24C38.69,24,24,38.69,24,56.8V80h16V56.8c0-9.28,7.53-16.8,16.8-16.8H80V24H56.8z" />
                  <path fill="#4285f4" d="M135.2,24H112v16h23.2c9.28,0,16.8,7.52,16.8,16.8V80h16V56.8C168,38.69,153.31,24,135.2,24z" />
                </svg>
              </button>
            </span>
          </div>
          <div className={styles.buttons}>
            <button type="button" className={styles.btn} onClick={submit}>Google 검색</button>
            <button type="button" className={styles.btn} onClick={submit}>I&apos;m Feeling Lucky</button>
          </div>
        </div>

        <p className={styles.langOffer}>
          Google 제공 서비스: <a href="#" onClick={(e) => e.preventDefault()}>English</a>
        </p>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerCountry}>대한민국</div>
        <div className={styles.footerLinks}>
          <nav className={styles.footerLeft}>
            <a href="#" onClick={(e) => e.preventDefault()}>광고</a>
            <a href="#" onClick={(e) => e.preventDefault()}>비즈니스</a>
            <a href="#" onClick={(e) => e.preventDefault()}>검색의 원리</a>
          </nav>
          <nav className={styles.footerRight}>
            <a href="#" onClick={(e) => e.preventDefault()}>개인정보처리방침</a>
            <a href="#" onClick={(e) => e.preventDefault()}>약관</a>
            <a href="#" onClick={(e) => e.preventDefault()}>설정</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
