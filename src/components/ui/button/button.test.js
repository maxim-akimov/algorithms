import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';


import { Button } from './button';


describe('Тестирование компонента Circle', () => {
  it('Активная кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button type={"button"} title={"Текст кнопки"} disabled={false} isLoader={false}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Активная кнопка без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button type={"button"} disabled={false} isLoader={false}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button type={"button"} title={"Текс кнопки"} disabled={true} isLoader={false}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button type={"button"} disabled={true} isLoader={false}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки с текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button type={"button"} title={"Текс кнопки"} disabled={false} isLoader={true}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button type={"button"} disabled={false} isLoader={true}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Клик на активную кнопку с текстом работает без ошибок', () => {
    window.alert = jest.fn();

    const onClick = () => {
      alert('click');
    }

    // Рендерим компонент
    render(<Button type={"button"} title={"Текст кнопки"} disabled={false} isLoader={false} onClick={onClick}/>)

    // Находим элемент ссылки
    const btn = screen.getByTitle('Текст кнопки');

    // Имитируем нажатие на ссылку
    fireEvent.click(btn);

    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('click');
  });
});