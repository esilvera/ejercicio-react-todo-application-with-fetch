import React, { useEffect, useState } from "react";
import Form from "./Form";

//create your first component
const Home = () => {
	const url = "https://assets.breatheco.de/apis/fake/todos/user/esilvera";
	const [list, setList] = useState([]); // Array vacio para agregar tareas
	const [task, setTask] = useState("");

	// ********************************************************************
	useEffect(() => {
		console.log("useEffect");
		getData();
	}, []);

	// ********************************************************************
	const getData = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(function(response) {
				if (response.status >= 200 && response.status < 300) {
					console.log("El request se hizo bien");
					return response.json();
				} else {
					console.log(
						`Hubo un error ${response.status} en el request`
					);
				}
			})
			.then(data => {
				console.log("data tiene: ", data);
				setList(data);
			})
			.catch(error => {
				console.log(error);
			});
	};
	// ********************************************************************

	const handleKeypress = evento => {
		// Verifica si se pulso la tecla enter
		if (evento.keyCode === 13) {
			handleSubmit(evento);
		}
	};

	const handleSubmit = evento => {
		evento.preventDefault();
		if (task.trim() === "") {
			//alert("Debe ingresar una Tarea");
			return;
		}
		let newTask = {
			//id: list.length > 0 ? list[list.length - 1].id + 1 : 1,
			label: task,
			done: false
		};

		let newList = [...list]; //Copia del array original
		newList.push(newTask); // Agrega nueva tarea al array
		setList(newList); // Actualiza array list con setList

		putData(newList); // Hace el PUT al array completo segun condicion de la API
		setTask("");
		evento.target.name.value = "";
	};

	const deleteTask = evento => {
		let newList = [...list];
		newList.splice(evento, 1);
		setList(newList);
		console.log("List tiene: ", list);

		putData(newList); // Hace el PUT al array completo segun condicion de la API
	};
	// ********************************************************************

	const putData = newList => {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newList)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	};

	return (
		<>
			<Form
				handleSubmit={handleSubmit}
				handleKeypress={handleKeypress}
				deleteTask={deleteTask}
				setTask={setTask}
				task={task}
				list={list}
			/>
		</>
	);
};

export default Home;
