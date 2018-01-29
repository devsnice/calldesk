import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import media from 'styled-media-query';

import { Formik } from 'formik';
import { Flex, Box } from 'grid-styled';

import Input from '../../units/Input/Input';
import Button from '../../units/Button/Button';
import Textarea from '../../units/Textarea/Textarea';
import Dropdown from '../../units/Dropdown/Dropdown';

import { isValidPhone } from '../../utils/formUtils';

const EditorTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 30px;
`;

const EditorControls = styled(Flex).attrs({
  justify: 'flex-end'
})`
  ${media.lessThan('small')`
    flex-direction: column;
    width: 200px;
  `};
`;

class PostEditor extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    post: PropTypes.object
  };

  static defaultProps = {
    post: null
  };

  handleValidate = values => {
    let errors = {};

    if (!values.title) {
      errors.title = 'Введите название';
    }

    if (values.title && values.title.length > 100) {
      errors.title = 'Максимум 100 символов';
    }

    if (values.description && values.description.length > 300) {
      errors.description = 'Максимум 300 символов';
    }

    if (!isValidPhone(values.phone)) {
      errors.phone = 'Введите номер телефонв';
    }

    return errors;
  };

  handleSubmit = values => {
    this.props.handleSubmit(values);
  };

  render() {
    const { post } = this.props;

    return (
      <Formik
        initialValues={post}
        validate={this.handleValidate}
        onSubmit={this.handleSubmit}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => {
          const isValid = !Object.keys(errors).length;

          return (
            <Box>
              <EditorTitle>
                {post ? 'Редактирование объявления' : 'Новое объявление'}
              </EditorTitle>

              <form>
                <Input
                  name="title"
                  label="Название"
                  onChange={handleChange}
                  value={values.title}
                  error={errors.title}
                />

                <Box mb="15px">
                  <Dropdown
                    onChange={setFieldValue}
                    name="city"
                    label="Город"
                    items={[
                      { key: 'moskow', value: 'Moskow', text: 'Москва' },
                      { key: 'spb', value: 'Spb', text: 'Питер' }
                    ]}
                    value={values.city}
                  />
                </Box>

                <Input
                  name="phone"
                  type="phone"
                  label="Номер телефона"
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone}
                />

                <Textarea
                  name="description"
                  label="Описание"
                  onChange={handleChange}
                  value={values.description}
                  error={errors.description}
                />

                <EditorControls>
                  <Button
                    onClick={this.props.handleCancel}
                    styles={{ mr: '15px' }}
                  >
                    Отменить
                  </Button>

                  <Button
                    disabled={!isValid || isSubmitting}
                    onClick={handleSubmit}
                  >
                    Сохранить
                  </Button>
                </EditorControls>
              </form>
            </Box>
          );
        }}
      />
    );
  }
}

export default PostEditor;
