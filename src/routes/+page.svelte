<script>
import Create from "./Create.svelte";
  import Steps from "./Steps.svelte";
</script>

<div class="container h-full mx-auto grid grid-cols-3 justify-center pt-5 ">
	<div class="">
		<Steps />
	</div>
	<div class="col-span mt-9">
		<Create />
	</div>
</div>