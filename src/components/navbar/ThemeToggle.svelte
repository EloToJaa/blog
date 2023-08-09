<script lang="ts">
  import DarkIcon from "../../icons/DarkIcon.svelte";
  import LightIcon from "../../icons/LightIcon.svelte";

  type Theme = "light" | "dark";
  let theme: Theme = (localStorage.getItem("theme") as Theme) || "dark";
  const iconClass = "h-7 md:h-8 hover:text-blue-700";

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
</script>

<button on:click={toggleTheme} class="px-3">
  {#if theme === "light"}
    <LightIcon {iconClass} />
  {:else}
    <DarkIcon {iconClass} />
  {/if}
</button>
