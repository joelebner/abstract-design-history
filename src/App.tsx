import { useState } from "react";
import { Button, ImageLightbox, TextField } from "./components";
import "./styles/vibecode.css";

import homeIcon from "./assets/icons16/Icon/16/Home.svg";
import folderIcon from "./assets/icons16/Icon/16/Folder.svg";
import notebookIcon from "./assets/icons16/Icon/16/Notebook.svg";
import activityIcon from "./assets/icons16/Icon/16/Activity.svg";
import reviewIcon from "./assets/icons16/Icon/16/Review.svg";
import insightsIcon from "./assets/icons16/Icon/16/Insights.svg";
import branchIcon from "./assets/icons16/Icon/16/Branch Reporting.svg";
import teamIcon from "./assets/icons16/Icon/16/Team.svg";
import flagIcon from "./assets/icons16/Icon/16/Flag.svg";
import notebookStatusIcon from "./assets/icons16/Icon/16/Notebook Status.svg";
import overflowIcon from "./assets/icons16/Icon/16/Overflow Menu.svg";
import oneClickLightboxImage from "./assets/one-click-lightbox.png";

type NavItem = { label: string; icon: string; active?: boolean; badge?: string };

const primaryNav: NavItem[] = [
  { label: "Home", icon: homeIcon },
  { label: "Projects", icon: folderIcon },
  { label: "Notebooks", icon: notebookIcon },
  { label: "Activity", icon: activityIcon },
  { label: "Reviews", icon: reviewIcon, badge: "3" },
  { label: "Branch Reporting", icon: branchIcon },
  { label: "Insights", icon: insightsIcon },
];

const notebookNav: NavItem[] = [
  { label: "Revamp Create Account ...", icon: notebookStatusIcon },
  { label: "App Launcher", icon: notebookStatusIcon },
  { label: "Streaming App Concept", icon: notebookStatusIcon },
  { label: "Checkout One-Click", icon: notebookStatusIcon },
  { label: "Brand Exploration", icon: notebookStatusIcon },
  { label: "Ideation Process", icon: notebookStatusIcon },
];

function NavRow({ item, nested = false }: { item: NavItem; nested?: boolean }) {
  return (
    <button
      type="button"
      className={["vc-nav-row", item.active && "is-active", nested && "is-nested"]
        .filter(Boolean)
        .join(" ")}
    >
      <img src={item.icon} alt="" aria-hidden width={16} height={16} />
      <span>{item.label}</span>
      {item.badge ? <span className="vc-badge">{item.badge}</span> : null}
    </button>
  );
}

const ONE_CLICK_LIGHTBOX_TITLE = "One-Click App Payments";

export default function App() {
  const [jumpQuery, setJumpQuery] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className="vc-page">
      <aside className="vc-sidebar">
        <div className="vc-sidebar-body">
          <div className="vc-org">
            <div className="vc-org-title">Abstract</div>
            <div className="vc-org-dot" />
          </div>

          <div className="vc-jump-field">
            <TextField
              id="vc-sidebar-jump"
              placeholder="Jump to..."
              value={jumpQuery}
              onChange={(e) => setJumpQuery(e.target.value)}
              aria-label="Jump to"
              autoComplete="off"
            />
          </div>

          <div className="vc-nav-group">
            {primaryNav.map((item) => (
              <NavRow key={item.label} item={item} />
            ))}
          </div>

          <div className="vc-section-title">Favorite Projects</div>
          <div className="vc-project-title">Propeller Labs</div>
          <div className="vc-nav-group vc-nav-group--dense">
            {notebookNav.map((item) => (
              <NavRow key={item.label} item={item} nested />
            ))}
          </div>
        </div>

        <div className="vc-user-footer">
          <span>Aari Page</span>
          <img src={teamIcon} alt="" aria-hidden width={16} height={16} />
        </div>
      </aside>

      <main className="vc-main">
        <header className="vc-page-header">
          <div className="vc-page-header__shell">
            <div className="vc-doc vc-page-header__title">
              <h1 className="vc-typography-notebook-title">Bank(TM) Homepage Updates</h1>
              <p>Created by Aari Page - Updated 2 days ago</p>
            </div>
            <div className="vc-header-actions vc-page-header__actions">
              <Button size="rounded" variant="secondary" visualState="default" dropdown>
                Share
              </Button>
              <button type="button" className="vc-icon-btn" aria-label="More options">
                <img src={overflowIcon} alt="" aria-hidden width={16} height={16} />
              </button>
              <button type="button" className="vc-icon-btn" aria-label="Activity">
                <img src={activityIcon} alt="" aria-hidden width={16} height={16} />
              </button>
            </div>
          </div>
        </header>

        <div className="vc-doc">
          <div className="vc-top-buttons">
            <Button
              size="rounded"
              variant="secondary"
              visualState="default"
              leading={<img src={notebookStatusIcon} alt="" aria-hidden width={16} height={16} />}
              dropdown
            >
              Work in progress
            </Button>
            <Button
              size="rounded"
              variant="secondary"
              visualState="default"
              leading={<img src={reviewIcon} alt="" aria-hidden width={16} height={16} />}
            >
              Request review
            </Button>
            <Button
              size="rounded"
              variant="secondary"
              visualState="default"
              leading={<img src={flagIcon} alt="" aria-hidden width={16} height={16} />}
            >
              Add decision
            </Button>
          </div>

          <div className="vc-reviews-stack">
            <h2 className="vc-reviews-heading" id="reviews-heading">
              Reviews
            </h2>
            <section className="vc-review-card" aria-labelledby="reviews-heading">
              <div className="vc-review-left">
                <img src={reviewIcon} alt="" aria-hidden width={16} height={16} />
                <div>
                  <strong>11/4 Design Review</strong>
                  <span>Closed by Aari Page 4 hours ago - 5 comments</span>
                </div>
              </div>
              <div className="vc-faces">
                <span />
                <span />
                <span />
              </div>
            </section>
          </div>

          <section className="vc-content">
            <h2 className="vc-typography-overview">Overview</h2>
            <h3 className="vc-typography-section">Goals</h3>
            <p>
              Redesign the Bank(TM) homepage hero to introduce One-Click App Payments to new and
              returning visitors. The hero should communicate speed and simplicity, establish
              trust, and drive account creation. Visual hierarchy should guide users from awareness
              to action without friction.
            </p>

            <div className="vc-hero">
              {/* Full-bleed hit target (hero “giant button”); left column uses pointer-events: none so clicks reach this layer */}
              <button
                type="button"
                className="vc-hero-hit"
                aria-label={`Open full view: ${ONE_CLICK_LIGHTBOX_TITLE}`}
                onClick={openLightbox}
              />
              <div className="vc-hero-left">
                <div className="vc-bank">Bank(TM)</div>
                <div className="vc-hero-title">One-Click App Payments</div>
                <div className="vc-hero-text">
                  Companies of all sizes, from all over the world, are using Bank(TM)'s new One-Click
                  payments.
                </div>
              </div>
              <div className="vc-signup-card">
                <div className="vc-signup-title">Sign up for Bank(TM)</div>
                <div className="vc-input" />
                <div className="vc-input" />
                <div className="vc-input" />
                <button type="button">Create Account</button>
              </div>
            </div>

            <h3 className="vc-typography-section">Proposal</h3>
            <p>
              Explore two hero directions: one leading with the product name at large scale against
              a clean, high-contrast background; a second using a lifestyle or device image to
              ground the feature in everyday use. Both directions will include a headline, a single
              supporting line, and a primary CTA. Typography and color should align with the
              existing Bank(TM) brand system.
            </p>

            <h3 className="vc-typography-section">Details</h3>
            <p>
              The final hero will be delivered at standard breakpoints (desktop, tablet, mobile).
              Copy is intentionally minimal - headline under eight words, subhead under twenty. The
              CTA button copies to "Create Account" across all variants. Assets will be handed off
              as a Figma component with auto-layout enabled and copy fields marked as editable
              instances.
            </p>
          </section>
        </div>
      </main>

      <ImageLightbox
        open={lightboxOpen}
        onClose={closeLightbox}
        title={ONE_CLICK_LIGHTBOX_TITLE}
        imageSrc={oneClickLightboxImage}
        imageAlt={ONE_CLICK_LIGHTBOX_TITLE}
      />
    </div>
  );
}
