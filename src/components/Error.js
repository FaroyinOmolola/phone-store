import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Loading(props) {
	return (
		<div className="pt-4">
			<Modal.Dialog className="" centered>
				<Modal.Header className="mx-auto border-0">
					{props.children}
				</Modal.Header>
			</Modal.Dialog>
		</div>
	);
}

export default Loading;
