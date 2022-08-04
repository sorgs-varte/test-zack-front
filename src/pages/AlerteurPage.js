import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "./AlerteurPage.css";

import { connect } from "react-redux";
import { signaler } from '../redux/actionner';

class AlerteurPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            animal: '',
            animals: ["Selectionnez un animal...", "Chien", "Chat", "Perroquet", "Lapin"],
            etatAnimals: ["Bon", "Moyen", "Faible", "Très faible"],
            extensionNumeros: ["", "Bis", "Ter", "Quater", "Autre"],
            extensionNumero: "",
            autreExtension: "",
            etatAnimal: 'Bon',
            collier: false,
            couleur: '',
            date: new Date(),
            numero: '',
            typeVoie: '',
            voie: '',
            codePostal: '',
            ville: '',
            creneauMin: '',
            creneauMax: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAnimal = this.handleChangeAnimal.bind(this);
        this.handleChangeEtatAnimal = this.handleChangeEtatAnimal.bind(this);
        this.handleChangeCollier = this.handleChangeCollier.bind(this);
        this.handleChangeCouleur = this.handleChangeCouleur.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeExtensionNumero = this.handleChangeExtensionNumero.bind(this);
        this.handleChangeNumero = this.handleChangeNumero.bind(this);
        this.handleChangeAutreExtension = this.handleChangeAutreExtension.bind(this);
        this.handleChangeTypeVoie = this.handleChangeTypeVoie.bind(this);
        this.handleChangeVoie = this.handleChangeVoie.bind(this);
        this.handleChangeCodePostal = this.handleChangeCodePostal.bind(this);
        this.handleChangeVille = this.handleChangeVille.bind(this);
        this.handleChangeCreneauMin = this.handleChangeCreneauMin.bind(this);
        this.handleChangeCreneauMax = this.handleChangeCreneauMax.bind(this);
        this.onClickEnvoyer = this.onClickEnvoyer.bind(this);
    }

    mapAnimals() {
        return (
            this.state.animals.map((a, key) => {
                return <option id={key}>{a}</option>
            })
        )
    }

    mapEtatAnimals() {
        return (
            this.state.etatAnimals.map((e, key) => {
                return <option id={key}>{e}</option>
            })
        )
    }

    mapExtensionNumero() {
        return (
            this.state.extensionNumeros.map((n, key) => {
                return <option id={key}>{n}</option>
            })
        )
    }

    mapCreneaux() {
        let number = []
        for (let i = 0; i < 24; i++) {
            number.push(i);
        }

        return (
            number.map((num, key) => {
                return <option id={key}>{num}</option>
            })
        )
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangeCouleur(event) {
        this.setState({ couleur: event.target.value });
    }

    handleChangeAnimal(event) {
        if (event.target.value !== this.state.animals[0])
            this.setState({ animal: event.target.value });
    }

    handleChangeEtatAnimal(event) {
        this.setState({ etatAnimal: event.target.value });
    }

    handleChangeExtensionNumero(event) {
        this.setState({ extensionNumero: event.target.value });
    }

    handleChangeCollier(event) {
        this.setState({ collier: !this.state.collier });
    }

    handleChangeDate(date) {
        this.setState({ date: date });
    }

    handleChangeNumero(event) {
        this.setState({ numero: event.target.value });
    }

    handleChangeAutreExtension(event) {
        this.setState({ autreExtension: event.target.value });
    }

    handleChangeTypeVoie(event) {
        this.setState({ typeVoie: event.target.value });
    }

    handleChangeVoie(event) {
        this.setState({ voie: event.target.value });
    }

    handleChangeCodePostal(event) {
        this.setState({ codePostal: event.target.value });
    }

    handleChangeVille(event) {
        this.setState({ ville: event.target.value });
    }

    handleChangeCreneauMin(event) {
        this.setState({ creneauMin: event.target.value });
    }

    handleChangeCreneauMax(event) {
        this.setState({ creneauMax: event.target.value });
    }

    onClickEnvoyer(event) {
        let signalement = {
            date: this.state.date,
            creneau: this.state.creneauMin + "-" + this.state.creneauMax,
            alerteur: this.state.email,
            animal: this.state.animal,
            couleur: this.state.couleur,
            adresse: {
                numero: this.state.numero,
                numeroExtension: this.state.extensionNumero === this.state.extensionNumeros[4] ? this.state.autreExtension : this.state.extensionNumero,
                typeVoie: this.state.typeVoie,
                nomVoie: this.state.voie,
                codePostal: this.state.codePostal,
                ville: this.state.ville
            },
            collier: this.state.collier,
            etat: this.state.etatAnimal
        }

        this.props.signaler(signalement)
            .then((data) => {
                this.setState({
                    email: '',
                    animal: '',
                    extensionNumero: "",
                    autreExtension: "",
                    etatAnimal: 'Bon',
                    collier: false,
                    couleur: '',
                    date: new Date(),
                    numero: '',
                    typeVoie: '',
                    voie: '',
                    codePostal: '',
                    ville: '',
                    creneauMin: '',
                    creneauMax: ''
                })
            })
            .catch((e) => {
                console.log(e)
            });

    }

    render() {
        return (
            <div className="container">
                {console.log(this.mapEtatAnimals())}
                <div className="row">
                    <div className="col"></div>
                    <div className="col-8">
                        <Card className="mt-5 mb-5">
                            <Card.Header>Signaler un animal</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Votre adresse email</Form.Label>
                                        <Form.Control type="email" placeholder="Adresse email" value={this.state.email} onChange={this.handleChangeEmail} />
                                        <Form.Text className="text-muted">
                                            Votre email servira seulement pour vous tenir informer de l'évolution de votre signalement.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Quel animal était-ce ?</Form.Label>
                                        <Form.Select onChange={this.handleChangeAnimal}>
                                            {this.mapAnimals()}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>De quel couleurs était-il ?</Form.Label>
                                        <Form.Control type="Text" placeholder="Couleur de l'animal" value={this.state.couleur} onChange={this.handleChangeCouleur} />
                                        <Form.Text className="text-muted">
                                            Ex: Gris, Roux, Noir... etc
                                        </Form.Text>
                                    </Form.Group>

                                    <Row>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Quel était l'état de santé de l'animal ?</Form.Label>
                                                <Form.Select onChange={this.handleChangeEtatAnimal}>
                                                    {this.mapEtatAnimals()}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col >
                                            <Form.Group className={"mt-4"} controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="L'animal avais un collier" value={this.state.collier} onChange={this.handleChangeCollier} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Label>A quel date avez-vous vu l'animal ?</Form.Label>
                                                <DatePicker selected={this.state.date} onChange={this.handleChangeDate} id={"datepicker"} className={"mb-3"} />
                                            </Col>
                                            <Col>
                                                <InputGroup className={"mt-3"}>
                                                    <InputGroup.Text>Entre</InputGroup.Text>
                                                    <Form.Select onChange={this.handleChangeCreneauMin}>
                                                        {this.mapCreneaux()}
                                                    </Form.Select>
                                                    <InputGroup.Text>et</InputGroup.Text>
                                                    <Form.Select onChange={this.handleChangeCreneauMax}>
                                                        {this.mapCreneaux()}
                                                    </Form.Select>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>A quel adresse avez-vous vu l'animal ?</Form.Label>
                                        <InputGroup className={"mb-3"}>
                                            <InputGroup.Text>N°</InputGroup.Text>
                                            <Form.Control value={this.state.numero} onChange={this.handleChangeNumero} />
                                            <Form.Select onChange={this.handleChangeExtensionNumero}>
                                                {this.mapExtensionNumero()}
                                            </Form.Select>
                                            {this.state.extensionNumero === this.state.extensionNumeros[4] ?
                                                <Form.Control value={this.state.autreExtension} onChange={this.handleChangeAutreExtension} /> : <div></div>}
                                        </InputGroup>
                                        <InputGroup className={"mb-3"}>
                                            <Form.Control value={this.state.typeVoie} onChange={this.handleChangeTypeVoie} placeholder={"Rue, Avenue..."} />
                                            <Form.Control value={this.state.voie} onChange={this.handleChangeVoie} placeholder={"Nom de la rue"} />
                                        </InputGroup>
                                        <InputGroup className={"mb-3"}>
                                            <Form.Control value={this.state.codePostal} onChange={this.handleChangeCodePostal} placeholder={"Code postal"} />
                                            <Form.Control value={this.state.ville} onChange={this.handleChangeVille} placeholder={"Ville"} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Row>
                                        <Col className="text-center">
                                            <Button variant="danger" className="center" href="/">
                                                Annuler
                                            </Button>
                                        </Col>
                                        <Col className="text-center">
                                            <Button variant="primary" onClick={this.onClickEnvoyer}>
                                                Envoyer
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col"></div>

                </div>
            </div>
        )
    }

}

export default connect(null, { signaler })(AlerteurPage);