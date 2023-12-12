<script lang="ts">
  import cn from "@utils/cn";
  import FormattedDatetime from "./FormattedDatetime.svelte";

  export let datetime: string | Date;
  export let size: "sm" | "lg" = "sm";
  export let className: string = "";
</script>

<div class={cn("flex items-center space-x-2 opacity-80 mb-3", className)}>
  <slot />
  <span class="sr-only">Posted on:</span>
  <span
    class={cn("font-semibold", {
      "text-sm": size === "sm",
      "text-base md:text-xl": size === "lg",
    })}
  >
    <FormattedDatetime {datetime} />
  </span>
</div>
