import Clutter from "gi://Clutter";
import GObject from "gi://GObject";
import Meta from "gi://Meta";
import St from "gi://St";

// Meta.is_wayland_compositor() was removed in GNOME 50 together with the
// X11 backend, so a missing function means the session is always Wayland.
// On GNOME 46-49 the real value is returned (X11 sessions still exist there).
export function isWaylandCompositor() {
  return Meta.is_wayland_compositor?.() ?? true;
}

// St.BoxLayout gained `orientation` in GNOME 48 and dropped the deprecated
// `vertical` property in GNOME 51. GJS throws on unknown constructor
// properties, so neither name works on every supported shell. Spread the
// result into the constructor: `new St.BoxLayout({...boxOrientation(true)})`.
export function boxOrientation(vertical) {
  const hasOrientation =
    GObject.Object.find_property.call(St.BoxLayout, "orientation") !== null;

  if (!hasOrientation) return { vertical };

  return {
    orientation: vertical
      ? Clutter.Orientation.VERTICAL
      : Clutter.Orientation.HORIZONTAL,
  };
}
