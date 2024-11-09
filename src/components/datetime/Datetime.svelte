<script lang="ts">
  import cn from "@utils/cn";
  import FormattedDatetime from "./FormattedDatetime.svelte";

  let {
    datetime,
    size = "sm",
    className = "",
    showTime = true,
  }: {
    datetime: string | Date;
    size?: "sm" | "lg";
    className?: string;
    showTime?: boolean;
  } = $props();
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
