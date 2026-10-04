# Portfolio analytics

Yandex Metrica counter: **113407862**. Webvisor, click map and scroll map are enabled.
Pageviews include client-side navigation; hash-only anchor changes are not separate pageviews.
Events contain page, case slug and language, never email addresses or visitor names.

Create JavaScript-event goals with these exact identifiers in Metrica:

| ID | Meaning |
| --- | --- |
| case_open | A case was opened |
| case_scroll_25 | Reached 25% of the case article |
| case_scroll_50 | Reached 50% |
| case_scroll_75 | Reached 75% |
| case_scroll_90 | Reached 90% |
| case_section_view | A section entered the viewport; section ID is a parameter |
| resume_click | Opened the CV link |
| telegram_click | Opened Telegram |
| email_copy | Successfully copied email |
| next_case_click | Recommendation click; source case and next_case are separate parameters |
| case_image_zoom | Zoom opened; image path and section identify the exact image |
| experience_link_hover | Company link hover lasting 500ms, once per company per pageview |
| experience_link_click | Company link clicked on the homepage |
| cat_visible | At least half of the footer cat entered the viewport, once per pageview |
| cat_hover | 500ms hover on an interactive cat, once per pageview |
| cat_click | Click starting the cat's walk-away, with current animation state |
| case_progress | Periodic/leave snapshot: section, section_title, max_scroll, active_seconds, reason, destination |

All events are shared across projects but retain the unique case slug and page.
Section titles supplement stable section IDs for human-readable reports.
Zoom reopens are separate events; use unique visitors to measure audience share.
Hover requires a hover-capable device and is cancelled if the pointer leaves
before 500ms or the tab becomes hidden. Automatic cat animation is not a click.

`case_progress` is sent every 15 seconds while visible, when visibility changes,
on link clicks, route cleanup and pagehide. Hidden does **not** mean closed:
the visitor may have switched tabs. Treat the final snapshot in a visit as the
last observed position, not a confirmed close or rejection. Delivery on exit is
best-effort; periodic snapshots retain a recent position if the browser is killed.
Active time excludes hidden periods and inactivity beyond 30 seconds.
Compare maximum depth separately from last section (visitors may scroll back).
Outbound destinations contain only a hostname, never full external query strings.

Scroll depth and section visibility measure exposure, not proof of reading.
Use Content → Popular for case rankings; Webvisor and scroll maps for exits and behaviour.
Use UTM-tagged application links to distinguish application traffic, without names, emails or other personal data.
Analytics cannot establish whether an untagged visitor is a recruiter or why they rejected an application.
Ad blockers can prevent collection. No tracking events are sent from localhost.
Review visitor privacy notice and any applicable consent requirements before expanding tracking.
