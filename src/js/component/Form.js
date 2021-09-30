import React, { useState } from "react";

const Form = ({ handleSubmit, handleKeypress, setTask, list, deleteTask }) => {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-12 text-center">
						<h1>todos</h1>
					</div>
				</div>
				<div className="row">
					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-md-4 offset-md-4 text-center">
								<input
									//id="task"
									name="name"
									type="text"
									className="form-control"
									placeholder="Escriba una tarea ..."
									onChange={evento =>
										setTask(evento.target.value)
									}
									onKeyPress={handleKeypress}
								/>
							</div>
						</div>
					</form>
				</div>
				<div className="row">
					<div className="col-md-4 offset-md-4 my-3">
						<ul className="list-group">
							{list.length > 0 &&
								list.map((newTask, index) => {
									// newtask tiene: {id: 1, task: "Tarea 1"} || index tiene: un indice de recorrido del array
									return (
										<li
											key={index} // Elemento unico para React
											className="list-group-item d-flex justify-content-between"
											id={index}>
											{newTask.label}
											<button
												type="button"
												className="btn-close"
												aria-label="Close"
												onClick={() =>
													deleteTask(index)
												}></button>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
export default Form;
