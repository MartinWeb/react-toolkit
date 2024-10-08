import { render } from '@testing-library/react';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardGroupCheckbox,
  CardHeader,
} from '../index';

describe('<Card>', () => {
  it('renders Card correctly', () => {
    const { asFragment } = render(
      <CardGroupCheckbox onChange={jest.fn()} values={['1']} id="id">
        <Card name="name" id="name" value="1">
          <CardHeader>
            <p className="af-rccard-header__title"> Référence</p>
            <p className="af-rccard-header__subtitle">50 € / mois</p>
          </CardHeader>
          <CardContent>
            <p>John Doe</p>
            <dl>
              <dt className="af-rccard__term"> Statut: </dt>
              <dd className="af-rccard__def"> En cours </dd>
              <dt className="af-rccard__term"> Epargne atteinte: </dt>
              <dd className="af-rccard__def"> 125 000 € </dd>
            </dl>
          </CardContent>
          <CardFooter>
            <p> Sortie en rente obligatoire </p>
          </CardFooter>
        </Card>
      </CardGroupCheckbox>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
