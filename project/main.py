import eel

tasks: list = []

@eel.expose
def loadTasks():
	global tasks
	with open('project\\tasks.txt', 'r', encoding='utf-8') as file:
		data = file.readlines()

		tasks = data

		_data = [i.replace('\n', '').split(', ') for i in data]

	return _data

def updateTasks(new_tasks):
	with open('project\\tasks.txt', 'w', encoding='utf-8') as file:
		file.writelines(new_tasks)

@eel.expose
def addTask(title, description):
	tasks.append(f"{title}, {description}\n")

@eel.expose
def delTask(task):
	tasks.remove(task)


def main():
	try:
		global tasks
		eel.init('project\interface')
		loadTasks()
		eel.start('index.html', size=(500,600), port = 8080, app_mode = True)

	except SystemExit:
		updateTasks(tasks)
	

if __name__ == "__main__":
	main()
	
