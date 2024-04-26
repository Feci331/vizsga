<script lang="ts">
  import { onMount } from "svelte";
  import { safeFetch } from "./http/index";
  import { z } from "zod";
  import { getHotels } from "./api/index";
  import { hotelSchema, hotelsArraySchema } from "./model/index";

  let HotelSchema1: typeof hotelsArraySchema | null = null;
  let error = "";
  let search = "";
  let minPrice = "";
  let maxPrice = "";
  let hotels: any[] = [];

 

/*   async function fetchAllHotels() {
    try {
      const { success, data, status } = await safeFetch(
        {
          method: "GET",
          path: `api/hotels`,
        },
        hotelsArraySchema
      );

      if (!success) {
        console.error("Validation Error or other issue:", status);
        error = `Failed to fetch all hotels with status: ${status}`;
        return;
      }

      hotels = data;
    } catch (err) {
      error = err.message;
      console.error("Fetch error:", err);
    }
  } */

  async function fetchHotels() {
    let query = search ? `includes=${search}` : `min=${minPrice}&max=${maxPrice}`;
    if (query === "min=&max=") { 
      query = ""; 
    }
    const { success, data, status } = await safeFetch({
      method: "GET",
      path: `/api/hotels?${query}`,
    }, hotelsArraySchema);

    if (success) {
      hotels = data;
    } else {
      error = `Failed to fetch hotels: ${status}`;
    }
  }

  $: fetchHotels(), [search, minPrice, maxPrice];

  onMount(fetchHotels);
</script>

<main
  class="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-gray-800"
>
  <h1 class="text-4xl font-bold mb-2">Looking for a place to stay?</h1>
  <h2 class="text-2xl font-semibold mb-8">Here are some hotels</h2>
  <div
    class="flex flex-col items-center gap-4 w-full max-w-md p-4 bg-white rounded-lg shadow-lg"
  >
    <input
      type="text"
      placeholder="Search by name..."
      bind:value={search}
      class="input input-bordered w-full"
    />
    <div class="flex gap-2 w-full">
      <input
        type="number"
        placeholder="Min price..."
        bind:value={minPrice}
        class="input input-bordered w-full"
      />
      <input
        type="number"
        placeholder="Max price..."
        bind:value={maxPrice}
        class="input input-bordered w-full"
      />
    </div>
    <button
      on:click={fetchHotels}
      class="btn bg-blue-500 hover:bg-blue-600 text-white w-full">Search</button
    >

    {#if error}
      <p class="text-red-500 mt-2">{error}</p>
    {/if}

    {#each hotels as hotel}
      <div class="hotel fade-in bg-gray-100 p-4 w-full rounded-lg mt-2">
        <p class="text-lg font-bold">{hotel.name}</p>
        <p>${hotel.pricePerNightInUSD} per night</p>
      </div>
    {/each}
    <!-- <div class="w-full">
      <button
        on:click={fetchAllHotels}
        class="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
        >All hotels</button
      >
    </div> -->
  </div>
</main>

<style>
  .fade-in {
    animation: fadeIn ease 1s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
