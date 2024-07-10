<script lang="ts">
  import cn from "@utils/cn";
  import FormattedDatetime from "./FormattedDatetime.svelte";

  export let datetime: string | Date;
  export let size: "sm" | "lg" = "sm";
  export let className: string = "";
  export let showTime: boolean = true;
</script>

<div class={cn("flex", className)}>
  <span class="sr-only">Posted on:</span>
  <span
    class={cn("font-semibold", {
      "text-sm": size === "sm",
      "text-base md:text-xl": size === "lg",
    })}
  >
    <FormattedDatetime {datetime} {showTime} />
  </span>
</div>
