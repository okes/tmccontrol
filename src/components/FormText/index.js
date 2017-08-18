/* @flow */

import React from 'react';

import styles from './styles.scss';

type Props = { name: string };

const FormText = ({ name }: Props) => (
  <div className={styles.FormText}>
    <div className={styles.TextName}>{name}</div>
    <div className={styles.TextValue}>buena</div>
  </div>
);

FormText.defaultProps = {
  name: '',
};

export default FormText;
