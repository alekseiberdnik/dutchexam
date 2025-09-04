
<script>
(function(){
  function setTheme(mode){
    document.documentElement.setAttribute('data-theme', mode);
  }
  function autoTheme(){
    const hour = new Date().getHours();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) return setTheme('dark');
    if (hour >= 7 && hour < 19) setTheme('light'); else setTheme('dark');
  }
  autoTheme();
  // Re-run on system theme change
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', autoTheme);
  }
})();
</script>
