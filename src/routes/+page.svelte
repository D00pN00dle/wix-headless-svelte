<script>
import { enhance } from '$app/forms';
    const { data } = $props();
    let status = $state('')
    $inspect(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<form method="POST" action="/api/testCollection" use:enhance={(result) => {
        return ({result}) => {
        // if (result.type === 'success') {
        //     status = 'success';
        // } else 
        //     status = 'error';
        // }
        console.log('Form submission result:', result);
    }}}>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <button type="submit" >Submit</button>
</form>
{#if status === 'success'}
    <p>Form submitted successfully!</p>
{:else if status === 'error'}
    <p>Form submission failed. Please try again.</p>
{/if}
