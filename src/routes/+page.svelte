<script>
    const { data } = $props();
    $inspect(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<form method="POST" action="/api/testCollection">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <button type="submit">Submit</button>
</form>