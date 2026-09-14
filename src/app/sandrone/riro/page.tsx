"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./page.module.css";
import { CODES, PASSWORD } from "../secrets";
import { copyText } from "../clipboard";

// 리로스쿨 로그인 화면의 아이콘들(원본 SVG를 그대로 data URI로 인라인).
const svg = (raw: string) => `data:image/svg+xml,${encodeURIComponent(raw)}`;

const LOGO_IC = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><style>.a{fill:#7f8284}.b{fill:#0091EA}</style></defs><g transform="translate(-386.456 -111.333)"><path class="a" d="M401.3 153.673a2.513 2.513 0 1 1-3.049-2.477v-1.638a4.139 4.139 0 1 0 4.342 2.545l-1.407.819a2.538 2.538 0 0 1 .114.751z" transform="translate(-2.64 -18.621)"/><path class="a" d="M404.087 144.267v1.621a5.079 5.079 0 0 1 3.584 2.1l1.391-.811a6.669 6.669 0 0 0-4.975-2.91z" transform="translate(-7.409 -15.941)"/><path class="a" d="M401.229 150.994a5.086 5.086 0 1 1-5.623-5.106v-1.621a6.731 6.731 0 1 0 6.583 3.85l-1.391.812a5.163 5.163 0 0 1 .431 2.065z" transform="translate(0 -15.941)"/><path class="a" d="m405.418 151.981 1.406-.819a4.1 4.1 0 0 0-2.737-1.6v1.638a2.508 2.508 0 0 1 1.331.781z" transform="translate(-7.409 -18.621)"/><path class="a" d="m417.871 137.272-1.375-.841a6.8 6.8 0 0 0-.022 5.918l1.391-.811a5.161 5.161 0 0 1 .006-4.265z" transform="translate(-13.344 -11.973)"/><path class="a" d="M426.033 135.672a2.536 2.536 0 0 1 0 5.072 2.5 2.5 0 0 1-1.822-.793l-1.409.821a4.092 4.092 0 0 0 3.231 1.587 4.152 4.152 0 0 0 0-8.3 4.093 4.093 0 0 0-3.236 1.594l1.386.849a2.494 2.494 0 0 1 1.85-.83z" transform="translate(-16.883 -10.771)"/><path class="a" d="M423.738 128.792a6.664 6.664 0 0 0-5.447 2.841l1.372.839a5.135 5.135 0 1 1-.008 6.131l-1.39.811a6.66 6.66 0 0 0 5.472 2.879 6.751 6.751 0 0 0 0-13.5z" transform="translate(-14.589 -8.105)"/><path class="a" d="m421.354 142.433 1.4-.818a2.5 2.5 0 0 1-.014-1.588l-1.392-.852a4.174 4.174 0 0 0 0 3.259z" transform="translate(-15.984 -13.362)"/><path class="b" d="M393.63 119.536a2.513 2.513 0 1 1 5.025 0 2.554 2.554 0 0 1-.138.819l3.6 2.2a6.675 6.675 0 1 0-6.512 3.705v-4.25a2.536 2.536 0 0 1-1.975-2.474z"/><path class="b" d="m408.969 132.2-3.6-2.2a2.507 2.507 0 0 1-1.282.731v4.25a6.67 6.67 0 0 0 4.882-2.781z" transform="translate(-7.409 -8.716)"/></g></svg>'
);

const CHECK_BLUE = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="m40.563 81.425-7.756 8.453-3.607-3.849a.428.428 0 0 0-.633 0l-1.055 1.127a.5.5 0 0 0 0 .676l4.977 5.314a.428.428 0 0 0 .633 0l9.128-9.918a.5.5 0 0 0 0-.676l-1.05-1.127a.428.428 0 0 0-.637 0z" transform="translate(-24.384 -77.285)" fill="#0091EA"/></svg>'
);

const CHECK_GREY = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="m40.563 81.425-7.756 8.453-3.607-3.849a.428.428 0 0 0-.633 0l-1.055 1.127a.5.5 0 0 0 0 .676l4.977 5.314a.428.428 0 0 0 .633 0l9.128-9.918a.5.5 0 0 0 0-.676l-1.05-1.127a.428.428 0 0 0-.637 0z" transform="translate(-24.383 -77.285)" fill="#c8c8c8"/></svg>'
);

const INFO_RED = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g transform="rotate(180 195.5 187.25)"><path fill="#f24147" d="M12 6c.552 0 1 .336 1 .75v4.5c0 .414-.448.75-1 .75s-1-.336-1-.75v-4.5c0-.414.448-.75 1-.75z" transform="translate(371 356)"/><path fill="#f24147" d="M12 16a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" transform="translate(371 353)"/></g><path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-6.4 8A6.4 6.4 0 1 0 10 3.6 6.4 6.4 0 0 0 3.6 10z" transform="translate(-2 -2)" fill="#f24147" fill-rule="evenodd"/></svg>'
);

const ARROW = svg(
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M5.375.5.5 5.375l4.875 4.875" transform="rotate(180 6.949 7.637)" fill="none" stroke="#777" stroke-linecap="square" stroke-miterlimit="10"/></svg>'
);

export default function RiroPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const idRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#fff";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  // 로그인(버튼/Enter): 비밀번호가 맞고 아이디 칸의 코드가 사전에 있으면 → 해당 텍스트 복사.
  // 어느 경우든 두 칸을 비운다(로그인 시도처럼).
  const submit = () => {
    const code = id.trim();
    const matched =
      pw.trim() === PASSWORD &&
      Object.prototype.hasOwnProperty.call(CODES, code);
    if (matched) copyText(CODES[code]);
    setId("");
    setPw("");
    idRef.current?.focus();
  };

  // <form> 대신 keydown 처리: hydration 전에 Enter를 눌러도 네이티브 submit이 일어나지 않게.
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    submit();
  };

  return (
    <div className={styles.page}>
      <div className={styles.column}>
        <div className={styles.portal}>
          <span className={styles.portalText}>리로포털</span>
          <img className={styles.portalArrow} src={ARROW} alt="" aria-hidden="true" />
        </div>

        <div className={styles.card}>
          <div className={styles.top}>
            <img className={styles.logo} src={LOGO_IC} alt="logo" />
            <div className={styles.hello}>
              <p>안녕하세요!</p>
              <p>
                <strong>단대소고</strong> 리로스쿨입니다.
              </p>
            </div>
          </div>

          <div className={styles.contents}>
            <ul className={styles.tabs}>
              <li className={styles.tab}>
                <img className={styles.check} src={CHECK_BLUE} alt="" aria-hidden="true" />
                <span className={styles.tabActive}>학생 · 교사</span>
              </li>
              <li className={styles.divider} aria-hidden="true" />
              <li className={styles.tab}>
                <img className={styles.check} src={CHECK_GREY} alt="" aria-hidden="true" />
                <span className={styles.tabInactive}>학부모</span>
              </li>
            </ul>

            <div className={styles.idInput}>
              <input
                ref={idRef}
                className={styles.input}
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="아이디"
                autoFocus
              />
              <div className={styles.idInfo}>
                <img className={styles.infoIc} src={INFO_RED} alt="" aria-hidden="true" />
                <p>
                  리로스쿨 통합가입 회원은 <strong>이메일을 입력</strong>하세요.
                </p>
              </div>
            </div>

            <div className={styles.pwInput}>
              <input
                className={styles.input}
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                placeholder="비밀번호"
                aria-label="비밀번호"
              />
            </div>

            <button type="button" className={styles.loginBtn} onClick={submit}>
              로그인
            </button>

            <ul className={styles.findArea}>
              <li className={styles.findBtn}>아이디 찾기</li>
              <li className={styles.findDivider} aria-hidden="true" />
              <li className={styles.findBtn}>비밀번호 찾기</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
