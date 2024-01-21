const btnAddTask = document.querySelector('.btn__add')
const tasks = document.querySelector('.tasks')
const taskTitle = document.querySelector('.task__title')
const taskDesc = document.querySelector('.task__description')

async function loadStartTasks() {
	return await eel.loadTasks()()
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=> {
		// .then(result => result)

		loadStartTasks().then(res => {
			if (res.length > 0) {
				for (let i = 0; i < res.length; i++) {
					tasks.insertAdjacentHTML('beforeend', createTask(res[i][0], res[i][1]))
				}
			}
		})
	}, 1000)
}, false);

function createTask(title, description) {
	const taskHTML = `
	<div class="task">
		<div info>
			<p class="title">${title}</p>
			<p class="desc">${description}</p>
		</div>
		<button class="btn__del">X</button>
	</div>
	`

	return taskHTML
}

btnAddTask.addEventListener('click', (e) => {
	title = taskTitle.value;
	desc = taskDesc.value;
	
	if (!title || !desc) {alert('Поля не должны быть пустыми'); return}

	tasks.insertAdjacentHTML('beforeend', createTask(title, desc));
	eel.addTask(title, desc);
})



tasks.addEventListener('click', e => {
	if (e.target.classList[0] == "btn__del") {
		let info = e.target.parentNode.children[0]
		title = info.children[0].textContent
		desc = info.children[1].textContent

		eel.delTask(`${title}, ${desc}\n`)
		e.target.parentNode.remove()
	}
})
