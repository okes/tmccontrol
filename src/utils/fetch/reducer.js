/* @flow */

import _ from 'lodash';

import {
  FETCH_SUCCESS,
  FETCH_ERROR,
} from './action';
import type { UtilFetch, Action } from '../../types';

type State = UtilFetch;

const initialState = {
  finanzas_gastos: [],
  finanzas_ganancias: [],
  finanzas_porvencer: [],
  finanzas_porvencerok: [],
  finanzas_cuotas: [],
  cuentas: [],
  mercaderia: [],
  mercaderiacombo: [],
  mercaderiacomboquitar: [],
  personal: [],
  data: null,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return _.assign({}, state, {
        [action.method]: action.data,
      });
    case FETCH_ERROR:
      return _.assign({}, state, {
        data: action.error,
      });
    default:
      return state;
  }
};
