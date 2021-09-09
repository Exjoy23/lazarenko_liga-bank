import React from 'react';
import { ConverterForm } from '../../converter-form/converter-form';
import { History } from '../../history/history';

function Converter() {
  return (
    <section id="converter">
      <ConverterForm />
      <History />
    </section>
  );
}

export { Converter };
