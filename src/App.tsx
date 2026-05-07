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
import variantMay101811 from "./assets/history/variant-may-10-1811.svg";
import variantMay91108 from "./assets/history/variant-may-9-1108.svg";
import variantMay90734 from "./assets/history/variant-may-9-0734.svg";
import variantMay71612 from "./assets/history/variant-may-7-1612.svg";
import variantMay71426 from "./assets/history/variant-may-7-1426.svg";
import variantMay41734 from "./assets/history/variant-may-4-1734.svg";
import variantMay41108 from "./assets/history/variant-may-4-1108.svg";
import variantMay20734 from "./assets/history/variant-may-2-0734.svg";

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
const LIGHTBOX_VERSION_IMAGE_SRCS = [
  variantMay101811, // May 10 • 6:11 pm
  variantMay91108, // May 9 • 11:08 am (duplicated from May 10)
  variantMay90734, // May 9 • 7:34 am
  variantMay71612, // May 7 • 4:12 pm
  variantMay71426, // May 7 • 2:26 pm
  variantMay41734, // May 4 • 5:34 pm
  variantMay41108, // May 4 • 11:08 am
  variantMay20734, // May 2 • 7:34 am
];

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
              <img
                className="vc-hero-preview-image"
                src={variantMay101811}
                alt={ONE_CLICK_LIGHTBOX_TITLE}
                loading="eager"
              />
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
        imageSrc={variantMay101811}
        imageAlt={ONE_CLICK_LIGHTBOX_TITLE}
        versionImageSrcs={LIGHTBOX_VERSION_IMAGE_SRCS}
      />
    </div>
  );
}
