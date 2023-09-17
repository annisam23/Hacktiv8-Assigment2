const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".little-card");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((card) => {
    card.addEventListener("dragover",(e) => {
        e.preventDefault();

        const buttomTask = insertAboveTask(card,e.clientY);
        const curTask = document.querySelector(".is-dragging");

        if(!buttomTask){
            card.appendChild(curTask);
        }else{
            card.insertBefore(curTask,buttomTask);
        }
    });
});

const insertAboveTask = (card,mouseY) => {
    const els = card.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closesOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const {top} = task.getBoundingClientRect();

        const offset = mouseY - top;

        if(offset < 0 && offset > closesOffset){
            closesOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};