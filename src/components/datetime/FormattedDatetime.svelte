<script lang="ts">
  export let datetime: string | Date;

  const myDatetime = new Date(datetime);


  const date = myDatetime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
  });

  const time = myDatetime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
  });
</script>

{date}
<span aria-hidden="true"> | </span>
<span class="sr-only">&nbsp;at&nbsp;</span>
{time}