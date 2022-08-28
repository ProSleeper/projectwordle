async function main() {
  const tasks = [1, 2, 3, 4, 5];

  for (const task of tasks) {
    await handleTask(task);
  }
}

function handleTask(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`task${id} finished!`);
      resolve();
    }, 1000);
  });
}

main();
