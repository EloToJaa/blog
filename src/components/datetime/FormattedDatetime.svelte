<script lang="ts">
  let {
    datetime,
    showTime = true,
  }: {
    datetime: string;
    showTime?: boolean;
  } = $props();

  const myDatetime = $derived(new Date(datetime));

  const date = $derived(
    myDatetime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  const time = $derived(
    myDatetime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })
  );
</script>

<time datetime={myDatetime.toISOString()}>
  {date}
  {#if showTime}
    <span aria-hidden="true">|</span>
    <span class="sr-only">&nbsp;at&nbsp;</span>
    {time}
  {/if}
</time>
