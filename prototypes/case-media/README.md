# Case media prototype (local only)

Run `node prototypes/case-media/serve.cjs` and open http://127.0.0.1:4175/.
No production routes, project catalog, or deployment changes.

- Saved for the next case; deliberately not mounted on any production page.
- Cloudimage before-after 1.0.4 (MIT), vendored with license: hover for fine pointers, drag for touch, line, initialPosition 90, entrance animation, theme toggle, keyboard and fullscreen. Exactly one top-center label (Inter 13px/440), selected by the predominant side. Fullscreen button has equal 12px top/right offsets; visible on hover/focus or touch. Zoom controls disabled.
- Figma exports: before 592:11147; after 596:12024; screen 604:17237; Bezel 604:16913 / 604:16914. File 6VP3Hb5uUg8onnXfYg6WdY.
- Comparison fills the full width at 4:3 with automatic height: no side strips or cropping. After uses after-blue.png, the updated Figma export with blue background; after.png retains the earlier white version.
- 530px default stage (480px phone stage on mobile); explicit 415px and 300px variants. Pickup uses contain at 530px with matching #e8e8e8 background; click opens the original. Large desktop screenshots retain natural proportions. No added captions. Phone screen 402×874 inside 450×920 bezel with 24px/23px inset. Zoom includes both screen and bezel with the site's translucent blurred overlay and Close button.
- Figma exports are 3×: comparison images 4800×3600, screen 1206×2622, bezel 1350×2760.
- `mountPhone` accepts `{poster, alt, videoSrc?}`. Without videoSrc it is a zoomable static image. With videoSrc: poster first, muted inline playback when visible, pause control, reduced-motion support. No video supplied for this prototype.
- `mountComparison(container, {beforeSrc, afterSrc, beforeAlt, afterAlt, locale?})` is independent of the phone primitive. Returns `setTheme(theme)` and `destroy()` for reuse and cleanup. RU/EN labels supported.
- Existing pickup image served read-only from public to compare the compact layout with the current large image. No original media modified.
