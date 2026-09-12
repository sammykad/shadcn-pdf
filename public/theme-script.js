(function(){
  try {
    var key = "theme";
    var stored = localStorage.getItem(key) || "system";
    var dark = stored === "dark";
    if (stored === "system") {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    var el = document.documentElement;
    el.classList.toggle("dark", dark);
    el.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
