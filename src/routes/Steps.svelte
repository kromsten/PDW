<script lang="ts">
	import { registered, username, credential } from '$lib';
    import { crossFade, sendingName } from '$lib/utils';
    import { onMount } from 'svelte';
    import { crossfade } from 'svelte/transition';    

    const [send, receive] = crossFade;
</script>


<div class="flex flex-col gap-2">
    { #if $sendingName && $username }
        <span out:send={{ key: "username" }} in:receive={{ key: "username" }} class="text-xl font-bold">{ $username ?? "Credential:" }</span>
    { /if }
</div>