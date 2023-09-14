document.addEventListener("DOMContentLoaded", function () {
  // DOM'un hazır olduğunda bu işlev çalışır

  // Gerekli HTML öğelerini alın
  const taskInput = document.getElementById("taskInput"); // Görev eklemek için input alanı
  const addTaskButton = document.getElementById("addTask"); // Görev eklemek için Ekle düğmesi
  const deleteAllButton = document.getElementById("deleteAll"); // Tüm görevleri silmek için Tümünü Sil düğmesi
  const taskList = document.getElementById("taskList"); // Görevleri listelemek için ul elementi

  // Görev ekleme işlevi
  function addTask() {
    // Input alanından metni alın ve boşlukları temizleyin
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      // Her görev için benzersiz bir kimlik oluşturun
      const taskId = Date.now();
      const listItem = document.createElement("li"); // Yeni bir liste öğesi oluşturun
      listItem.setAttribute("data-id", taskId); // Veri kimliği ekleyin

      // Liste öğesini HTML içeriğiyle doldurun
      listItem.innerHTML = `
                <input type="checkbox">
                <span>${taskText}</span>
                <button class="deleteTask">Sil</button>
            `;

      // Liste öğesini görev listesine ekleyin
      taskList.appendChild(listItem);

      // Input alanını temizleyin
      taskInput.value = "";
    }
  }

  // Ekle düğmesine tıklama olayı için dinleyici ekle
  addTaskButton.addEventListener("click", addTask);

  // Input alanında Enter tuşuna basıldığında da görev eklemeyi başlatın
  taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Görev listesine tıklama olayı için dinleyici ekle
  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteTask")) {
      // Sil düğmesine tıklanırsa
      const listItem = event.target.parentElement; // Tıklanan düğmenin üst öğesini alın
      const checkbox = listItem.querySelector("input[type='checkbox']"); // Checkbox'u bulun

      if (checkbox.checked) {
        // Checkbox işaretliyse, liste öğesini kaldırın
        listItem.remove();
      }
    }
  });

  // Tümünü Sil düğmesine tıklama olayı için dinleyici ekle
  deleteAllButton.addEventListener("click", function () {
    const tasks = document.querySelectorAll("li"); // Tüm liste öğelerini seçin
    tasks.forEach(function (task) {
      // Her liste öğesini kaldırın
      task.remove();
    });
  });
});
