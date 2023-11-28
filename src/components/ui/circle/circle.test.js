import renderer from 'react-test-renderer';
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Тестирование компонента Circle', () => {
  it('Круг без буквы рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг с буквами рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle letter={'abc'}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг c head рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle head={'head'}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг с react-элементом в head рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle head={<Circle/>}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг c tail рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle tail={'tail'}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг с react-элементом в tail рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle tail={<Circle/>}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг с index рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle index={1}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг с пропом isSmall рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle isSmall={true}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг в состоянии default рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг в состоянии changing рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('Круг в состоянии modified рендерится без ошибок', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});