<script lang="ts">
  import { credential, registered, username } from "$lib";
  import { crossFade, sendingName } from "$lib/utils";


	import { client, server } from "@passwordless-id/webauthn";
  	import type { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
  import { Step } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

	const registrationChallenge = btoa("foo");

    const [send, _] = crossFade;


	let name : string


	type Step = "register" | "after_register" | "authenticate" | "success";


	const register = async () => {
		const regRes = await client.register(name, registrationChallenge, {
			authenticatorType: "both",
			discoverable: "preferred",
		});

		return regRes;
	}

	const validate = async (regRes: RegistrationEncoded) => {
		const valRes = await server.verifyRegistration(regRes, {
			challenge: registrationChallenge,
			origin: window.location.origin,
		});

		return valRes;
	}

	const onClick = async () => {

		if (!$registered) {
			const regRes = await register();
			console.log("regRes:", regRes);
			const valRes = await validate(regRes);
			console.log("valRes:", valRes);
            
			registered.set(true);
			username.set(valRes.username ?? name)
			credential.set(valRes.credential);
		}
	}

    let step : Step = "register";


    onMount(() => {
        if ($credential) {
            registered.set(true);
        }

        if ($registered) {
            step = "after_register";

            setTimeout(() => {
                sendingName.set(true);
                step = "authenticate";
            }, 1000);
        }
    })

    $: if (step == "authenticate") {
    }



</script>

<div class="flex flex-col gap-7">

    { #if step == 'register' }

        <input type="text" class="input center p-3 text-center" placeholder="Select Username" bind:value={name} />

        <button 
            class="btn btn-md variant-filled font-bold" 
            disabled={!name || $registered}
            on:click={onClick}
        >
            { #if $registered }
                Success
            {:else}
                Get Device Credential
            {/if}
        </button>
        
    { :else if step == 'after_register' && $username }
        
        <div class="center p-3 text-center text-2xl font-bold" out:send={{ key: "username" }} >
            { $username }
        </div>
    { :else }
        
    {/if}

    
</div>
