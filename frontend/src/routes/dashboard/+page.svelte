<script>
  export let userName = 'John Doe'; // Pass the user name from the parent component or context
</script>

<section
  class="bg-white dark:bg-gray-800 relative bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 w-full h-full top-0 left-0 z-0 p-10"
  style="background-image: linear-gradient(to bottom, var(--tw-gradient-stops) 100%);"
>
  <div
    class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-8 md:p-12 mb-8 shadow-md"
  >
    <h1 class="mb-3 text-3xl">👋</h1>
    <h1
      class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white"
    >
      Welcome back, <span class="text-primary-600 dark:text-primary-500"
        >{userName}</span
      > !
    </h1>
    <p
      class="text-md font-normal text-gray-500 lg:text-md dark:text-gray-300 text-justify"
    >
      Get back to growth with the <span
        class="text-primary-600 dark:text-primary-500">world's #1</span
      > CRM. From this dashboard, you can efficiently manage your assets, track all
      your transactions, and explore exciting opportunities in the marketplace. Below
      are your Portfolio Stats and Key Metrics Overview, designed to provide you
      with comprehensive insights and tools. Use these features to unlock long-term
      value and drive sustainable economic growth.
    </p>
  </div>

  <!-- ========= STATISTICS ======== -->
  <div
    class="w-full bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md"
  >
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select tab</label>
      <select
        id="tabs"
        class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Statistics</option>
      </select>
    </div>
    <ul
      class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
      id="fullWidthTab"
      data-tabs-toggle="#fullWidthTabContent"
      role="tablist"
    >
      <li class="w-full">
        <button
          id="stats-tab"
          data-tabs-target="#stats"
          type="button"
          role="tab"
          aria-controls="stats"
          aria-selected="true"
          class="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >Portfolio Statistics and Key Metrics Overview</button
        >
      </li>
    </ul>
    <div
      id="fullWidthTabContent"
      class="border-t border-gray-200 dark:border-gray-600"
    >
      <div
        class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        id="stats"
        role="tabpanel"
        aria-labelledby="stats-tab"
      >
        <dl
          class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8"
        >
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">100+</dt>
            <dd class="text-gray-500 dark:text-gray-400">
              Total Assets Listed
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">70+</dt>
            <dd class="text-gray-500 dark:text-gray-400">Assets Owned</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">$1896450</dt>
            <dd class="text-gray-500 dark:text-gray-400">
              Current Wallet Balance
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">$50000</dt>
            <dd class="text-gray-500 dark:text-gray-400">
              Highest Amount Asset
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">$527000</dt>
            <dd class="text-gray-500 dark:text-gray-400">Total Transactions</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-3xl font-extrabold">$20000</dt>
            <dd class="text-gray-500 dark:text-gray-400">
              Average Asset Value
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</section>
