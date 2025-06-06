<script>
  import Icon from '@iconify/svelte';
  

  /**
   * @typedef {{ title: string, completed: boolean }} Task
   */

  /** @type {Task[]} */
  let tasks = [
    { title: 'Buy new sweatshirt', completed: true },
    { title: 'Read an article', completed: true },
    { title: 'Write blog post', completed: false },
    { title: 'Watch "Mr Robot', completed: false },
    { title: 'Run', completed: false },
  ];

  let newTask = '';

  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const monthName = months[date.getMonth()];
  const weekDay = weekdays[date.getDay()];
  const monthDay = date.getDate();

  /** @param {number} index */
  function toggle(index) {
    tasks[index].completed = !tasks[index].completed;
  }

  /** @param {number} index */
  function remove(index) {
    tasks.splice(index, 1);
    tasks = [...tasks];
  }

  function addTask() {
    if (!newTask.trim()) return;
    tasks = [...tasks, { title: newTask.trim(), completed: false }];
    newTask = '';
  }
</script>

<div class="bg-white shadow w-72 p-4 relative">
  <div class="p-5 text-center border-b-[3px] border-hr -mx-4">
    <h1 class="text-primary text-3xl font-bold">
      {monthName}
    </h1>
    
    <div class="text-description mt-4 text-sm">
      {weekDay}, {monthName} {monthDay}
    </div>
  </div>

  {#if tasks.length > 0}
    <div class="flex flex-col mt-5 gap-1 my-6 -mx-1.5 leading-none max-h-80 overflow-auto custom-scroll">
      {#each tasks as task, i}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div role="button" tabindex="0" on:click={() => toggle(i)} class={`flex relative items-center select-none cursor-pointer text-primary font-normal py-2 group px-1.5 ${task.completed ? 'text-secondary line-through' : ''} hover:bg-hr`}>
          <button on:click|stopPropagation={() => remove(i)} class="border border-error mr-1.5 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:scale-120 transition-all absolute">
            <Icon icon="mdi:close" class="text-error text-base" />
          </button>
          <p class="flex-1 group-hover:translate-x-6 transition-all">{task.title}</p>
          <p class="text-xl">
            {#if task.completed}
              <Icon icon="mdi:face-happy-outline" class="text-success" />
            {:else}
              <Icon icon="mdi:face-neutral-outline" class="text-secondary" />
            {/if}
          </p>
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex justify-center m-4 text-primary">No tasks yet</div>
  {/if}

  <form on:submit|preventDefault={addTask} class="flex mb-8">
    <input bind:value={newTask} type="text" placeholder="Add Task" maxlength="250" class="flex-1 border border-secondary text-primary outline-none p-4 text-base placeholder:!text-secondary ">

    <div class="absolute bottom-0 right-1/2 translate-1/2">
      <button class="bg-success border-none rounded-4xl text-xs text-white py-1.5 px-8 shadow-md cursor-pointer transition-all  hover:shadow-gray-400">
        Add
      </button>
    </div>
  </form>
</div>
