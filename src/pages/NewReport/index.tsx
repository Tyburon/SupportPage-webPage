import React, { useCallback, useEffect, useRef, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Content from '@material-ui/core/Container';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

interface ReportFormData {
  problem_id: string;
  user_id: string;
  employe_id: string;
  description: string;
  status: boolean;
}
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


import { FiPower } from 'react-icons/fi';
import { Link, useHistory  } from 'react-router-dom';
import {
  Report,
  Container,
  Header,
  HeaderContent,
  Profile,
  MenuList,
  MenuListItem,
} from './styles';

interface Problem {
  id: string;
  name: string;
}

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';


const NewReport: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const classes = useStyles();
  const { signOut, user } = useAuth();
  const [problems, setProblems] = useState<Problem>([]);

  useEffect(() => {
    api
      .get<Report[]>('/problems')
      .then(response => {
        setProblems(response);
      });
  }, []);


  const handleSubmit = useCallback(
    async (data: ReportFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          problem_id,
          user_id,
          employe_id,
          description,
          status,
        } = data;

        const formData = {
          problem_id,
          user_id,
          employe_id,
          description,
          status,
        };

        const response = await api.put('/report', formData);


        history.push('/dashboard');

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

      }
    },
    [ history ],
  );


  return (
    <>
      <CssBaseline />
      <Container>
        <Header>
          <HeaderContent>
            {/* <img src={logoImg} alt="Support" /> */}

            <Profile>
              <div>
                <strong>{user.name}</strong>
              </div>
            </Profile>

            <MenuList>
              <MenuListItem>
                <Link to="/">Chamados</Link>
              </MenuListItem>
              <MenuListItem>
                <Link to="/">Abrir Chamado</Link>
              </MenuListItem>
            </MenuList>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>

        <Content maxWidth="sm">
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <Autocomplete
            name="name"
            id="name"
            options={problems}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Problema" variant="outlined" />}
          />

      <Button type="submit" variant="contained" color="primary">
        Primary
      </Button>
      </Form>
        </Content>


      </Container>
    </>
  );
};

export default NewReport;
