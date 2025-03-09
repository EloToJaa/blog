<script lang="ts">
  import FormattedDatetime from "./FormattedDatetime.svelte";
  import cn from "@utils/cn";

  const {
    datetime,
    size = "sm",
    className = "",
    showTime = true,
  }: {
    datetime: string;
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
