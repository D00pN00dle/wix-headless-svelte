<script>
import { enhance } from '$app/forms';
    const { data } = $props();
    $inspect(data);
    let loading = $state(false);
    let status = $state(''); // 'success', 'error', or ''
    /**@param {Event} event */
    async function onSubmit(event) {
        let error = '';
        event.preventDefault();
        loading = true;
        
        const form = event.currentTarget;
        //@ts-ignore
        const formData = new FormData(form);

        try {
        const res = await fetch('/api/testCollection', {
            method: 'POST',
            body: formData // send as multipart/form-data
        });

        const result = await res.json();

        if (!res.ok || !result.ok) {
            status = 'error';
            throw new Error(result.error || `Request failed (${res.status})`);
        }
        status = 'success';
        //@ts-ignore
        form.reset();
        console.log('Inserted item:', result.data);
        } catch (e) {
        error = e instanceof Error ? e.message : 'Something went wrong';
        } finally {
        loading = false;
        }
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<form onsubmit={onSubmit}>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <button type="submit" >Submit</button>
</form>
{#if status === 'success'}
    <p>Form submitted successfully!</p>
{:else if status === 'error'}
    <p>Form submission failed. Please try again.</p>
{/if}
