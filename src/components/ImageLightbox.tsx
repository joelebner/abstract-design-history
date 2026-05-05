import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import commentIcon from "../assets/icons16/Icon/16/Comment.svg";
import overflowIcon from "../assets/icons16/Icon/16/Overflow Menu.svg";

export type ImageLightboxProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  imageSrc?: string;
  imageAlt?: string;
};

type VersionRow = {
  timestamp: string;
  name: string;
  hasComments?: boolean;
};

type RailComment = {
  author: string;
  timeAgo: string;
  body: string;
  /** First demo comment shows reaction pills */
  showReactions?: boolean;
};

type RailVersionBlock = {
  /** Matches `VERSION_ROWS` index for left-rail selection sync */
  versionRowIndex: number;
  uploadTimestamp: string;
  uploaderName: string;
  comments: RailComment[];
};

/** Right rail: grouped title row + comments for each upload (scrolls above composer). */
const RAIL_VERSION_BLOCKS: RailVersionBlock[] = [
  {
    versionRowIndex: 0,
    uploadTimestamp: "May 10 • 6:11 pm",
    uploaderName: "Aari Page",
    comments: [
      {
        author: "Aari Page",
        timeAgo: "20h",
        body: "Should we put the URL at the top of this message? If the point is to click through, that access point should be easiest to reach.",
        showReactions: true,
      },
      {
        author: "Darren Stuff",
        timeAgo: "2 days",
        body: "Maybe @joebert knows if bold can be used in plain text emails? I support elevating the URL if we think the email body will be long.",
      },
    ],
  },
  {
    versionRowIndex: 1,
    uploadTimestamp: "May 9 • 11:08 am",
    uploaderName: "Aari Page",
    comments: [
      {
        author: "Aari Page",
        timeAgo: "1 day",
        body: "Looks good to ship this iteration—the hierarchy reads clearly on smaller breakpoints.",
      },
      {
        author: "Sam Rivera",
        timeAgo: "1 day",
        body: "Copy is clear; we can tighten the CTA label in the next pass if product agrees.",
      },
    ],
  },
  {
    versionRowIndex: 3,
    uploadTimestamp: "May 7 • 4:12 pm",
    uploaderName: "Aari Page",
    comments: [
      {
        author: "Darren Stuff",
        timeAgo: "3 days",
        body: "Do we need a legal line under the primary button, or is that covered on the next screen?",
      },
      {
        author: "Aari Page",
        timeAgo: "3 days",
        body: "Legal reviewed the flow last sprint—we’re OK without an extra line here.",
      },
    ],
  },
];

const VERSION_ROWS: VersionRow[] = [
  { timestamp: "May 10 • 6:11 pm", name: "Aari Page", hasComments: true },
  { timestamp: "May 9 • 11:08 am", name: "Aari Page", hasComments: true },
  { timestamp: "May 9 • 7:34 am", name: "Aari Page" },
  { timestamp: "May 7 • 4:12 pm", name: "Aari Page", hasComments: true },
  { timestamp: "May 7 • 2:26 pm", name: "Aari Page" },
  { timestamp: "May 4 • 5:34 pm", name: "Aari Page" },
  { timestamp: "May 4 • 11:08 am", name: "Aari Page" },
  { timestamp: "May 2 • 7:34 am", name: "Aari Page" },
];

/** Centered modal over a dimmed backdrop; body scroll locked while open. */
export function ImageLightbox({ open, onClose, title, imageSrc, imageAlt }: ImageLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const commentsBodyRef = useRef<HTMLDivElement>(null);
  const versionBlockRefs = useRef(new Map<number, HTMLElement>());
  /** After open, skip the first scroll run (default selection already at top). */
  const skipNextRailScroll = useRef(true);
  const [activeVersionIdx, setActiveVersionIdx] = useState(0);
  const [commentsTailHeight, setCommentsTailHeight] = useState(0);
  const [isRailDragging, setIsRailDragging] = useState(false);
  const railDragThresholdPx = 4;
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const suppressNextRailBlockClickRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const container = commentsBodyRef.current;
    if (!container) return;
    const updateTailHeight = () => {
      // Add scroll slack equal to viewport height so any version header can snap to top.
      setCommentsTailHeight(container.clientHeight);
    };
    updateTailHeight();
    const observer = new ResizeObserver(updateTailHeight);
    observer.observe(container);
    window.addEventListener("resize", updateTailHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTailHeight);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      dragPointerIdRef.current = null;
      suppressNextRailBlockClickRef.current = false;
      setIsRailDragging(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      skipNextRailScroll.current = true;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (skipNextRailScroll.current) {
      skipNextRailScroll.current = false;
      return;
    }
    const row = VERSION_ROWS[activeVersionIdx];
    if (!row?.hasComments) return;
    const hasRail = RAIL_VERSION_BLOCKS.some((b) => b.versionRowIndex === activeVersionIdx);
    if (!hasRail) return;
    const blockEl = versionBlockRefs.current.get(activeVersionIdx);
    const container = commentsBodyRef.current;
    if (!blockEl || !container) return;
    const id = requestAnimationFrame(() => {
      const cRect = container.getBoundingClientRect();
      const bRect = blockEl.getBoundingClientRect();
      const nextTop = container.scrollTop + (bRect.top - cRect.top);
      container.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [open, activeVersionIdx]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="vc-lightbox-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="vc-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="vc-lightbox__topbar">
          <div className="vc-lightbox__topbar-left">
            <button
              ref={closeRef}
              type="button"
              className="vc-lightbox__close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id={titleId} className="vc-lightbox__title">
              {title}
            </h2>
          </div>
          <div className="vc-lightbox__topbar-actions">
            <button type="button" className="vc-lightbox__ghost-btn">
              Link to Figma
            </button>
            <button type="button" className="vc-lightbox__toggle-btn">
              Annotate <span>On</span>
            </button>
            <button type="button" className="vc-lightbox__icon-btn" aria-label="More options">
              <img src={overflowIcon} alt="" aria-hidden width={16} height={16} />
            </button>
          </div>
        </header>

        <div className="vc-lightbox__body">
          <aside className="vc-lightbox__history">
            <div className="vc-lightbox__history-list">
              {VERSION_ROWS.map((row, idx) => (
                <button
                  type="button"
                  key={`${row.timestamp}-${idx}`}
                  className={[
                    "vc-lightbox__history-row",
                    idx === activeVersionIdx && "is-active",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setActiveVersionIdx(idx)}
                >
                  <div>
                    <strong>{row.timestamp}</strong>
                    <span>{row.name}</span>
                  </div>
                  {row.hasComments ? (
                    <span className="vc-lightbox__bubble" aria-hidden>
                      <img src={commentIcon} alt="" width={16} height={16} />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </aside>

          <main className="vc-lightbox__canvas">
            <div className="vc-lightbox__artboard">
              {imageSrc ? (
                <img
                  className="vc-lightbox__image"
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  loading="eager"
                />
              ) : null}
            </div>
          </main>

          <aside className="vc-lightbox__comments">
            <div
              ref={commentsBodyRef}
              className={[
                "vc-lightbox__comments-body",
                isRailDragging && "is-dragging",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={(e) => {
                if (suppressNextRailBlockClickRef.current) {
                  suppressNextRailBlockClickRef.current = false;
                  return;
                }
                const target = e.target as HTMLElement;
                const block = target.closest<HTMLElement>(".vc-lightbox__version-block");
                if (!block) return;
                const idx = block.dataset.versionRowIndex;
                if (typeof idx !== "string") return;
                const parsed = Number.parseInt(idx, 10);
                if (Number.isNaN(parsed)) return;
                setActiveVersionIdx(parsed);
              }}
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                const target = e.target as HTMLElement;
                if (
                  target.closest(".vc-lightbox__composer, button, input, textarea, a")
                ) {
                  return;
                }
                const container = commentsBodyRef.current;
                if (!container) return;
                dragPointerIdRef.current = e.pointerId;
                dragStartYRef.current = e.clientY;
                dragStartScrollTopRef.current = container.scrollTop;
                suppressNextRailBlockClickRef.current = false;
                container.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (dragPointerIdRef.current !== e.pointerId) return;
                const container = commentsBodyRef.current;
                if (!container) return;
                const deltaY = e.clientY - dragStartYRef.current;
                if (Math.abs(deltaY) >= railDragThresholdPx) {
                  suppressNextRailBlockClickRef.current = true;
                  if (!isRailDragging) setIsRailDragging(true);
                }
                container.scrollTop = dragStartScrollTopRef.current - deltaY;
              }}
              onPointerUp={(e) => {
                const container = commentsBodyRef.current;
                if (dragPointerIdRef.current !== e.pointerId || !container) return;
                if (!suppressNextRailBlockClickRef.current) {
                  const elAtPoint = document.elementFromPoint(e.clientX, e.clientY) as
                    | HTMLElement
                    | null;
                  const block = elAtPoint?.closest<HTMLElement>(".vc-lightbox__version-block");
                  const idx = block?.dataset.versionRowIndex;
                  if (typeof idx === "string") {
                    const parsed = Number.parseInt(idx, 10);
                    if (!Number.isNaN(parsed)) setActiveVersionIdx(parsed);
                  }
                }
                if (container.hasPointerCapture(e.pointerId)) {
                  container.releasePointerCapture(e.pointerId);
                }
                dragPointerIdRef.current = null;
                suppressNextRailBlockClickRef.current = false;
                setIsRailDragging(false);
              }}
              onPointerCancel={(e) => {
                const container = commentsBodyRef.current;
                if (dragPointerIdRef.current !== e.pointerId || !container) return;
                if (container.hasPointerCapture(e.pointerId)) {
                  container.releasePointerCapture(e.pointerId);
                }
                dragPointerIdRef.current = null;
                suppressNextRailBlockClickRef.current = false;
                setIsRailDragging(false);
              }}
            >
              {RAIL_VERSION_BLOCKS.map((block, blockIdx) => {
                const isSelected = block.versionRowIndex === activeVersionIdx;
                return (
                <section
                  key={`${block.uploadTimestamp}-${blockIdx}`}
                  ref={(node) => {
                    if (node) versionBlockRefs.current.set(block.versionRowIndex, node);
                    else versionBlockRefs.current.delete(block.versionRowIndex);
                  }}
                  data-version-row-index={block.versionRowIndex}
                  role="button"
                  tabIndex={0}
                  className={[
                    "vc-lightbox__version-block",
                    isSelected && "is-selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveVersionIdx(block.versionRowIndex);
                    }
                  }}
                >
                  <div className="vc-lightbox__comments-header">
                    <strong>{block.uploadTimestamp}</strong>
                    <span>{block.uploaderName}</span>
                  </div>
                  <div className="vc-lightbox__thread">
                    {block.comments.map((c, idx) => (
                      <article
                        key={`${block.uploadTimestamp}-${idx}-${c.author}`}
                        className="vc-lightbox__comment"
                      >
                        <p>
                          <strong>{c.author}</strong> <span>{c.timeAgo}</span>
                        </p>
                        <p>{c.body}</p>
                        {c.showReactions ? (
                          <div className="vc-lightbox__reactions">
                            <button type="button">+1 1</button>
                            <button type="button">?</button>
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </section>
                );
              })}
              {/* Fills unused rail height below comment blocks so “null” whitespace is real layout, not background-only */}
              <div
                className="vc-lightbox__comments-tail"
                style={{ height: `${commentsTailHeight}px` }}
                aria-hidden
              />
            </div>

            <div className="vc-lightbox__composer">
              <input type="text" placeholder="Write a comment" aria-label="Write a comment" />
              <div className="vc-lightbox__composer-actions">
                <button type="button" className="vc-lightbox__ghost-btn">
                  Annotate
                </button>
                <button type="button" className="vc-lightbox__primary-btn">
                  Comment
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}
