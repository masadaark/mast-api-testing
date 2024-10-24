import { binding, then } from 'cucumber-tsflow';
import ScenarioClass from '../../class/scenario.class';
import HttpAssertionLogic from '../../logic/้http/http_assertion.logic';
import ResClass from '../../class/response.class';
import { HttpListResponse, HttpResponse } from '../../interface/file_interface/http_file.model';
import { expect } from 'chai';
import StorageLogic from '../../logic/storage/storage.logic';
import VFormatter from '../../class/formatter.class';
import AssertionLogic from '../../logic/assertion.logic';
import CompLogic from '../../logic/comparator.logic';
import Obj from '../../util/object.util';
import Validator from '../../logic/validator.logic';

@binding()
export class HttpAssertionController {
  @then('Expecting Http response subset')
  public HttpResponseAssertionSubset(): void {
    if (!ScenarioClass.Http) return;
    HttpAssertionLogic.SubSet(ResClass.Http, ScenarioClass.Http.response as HttpResponse);
  }
  @then('Expecting Http response deeply equal')
  public HttpResponseAssertionDeeplyEqual(): void {
    if (!ScenarioClass.Http) return;
    HttpAssertionLogic.DeepEqual(ResClass.Http, ScenarioClass.Http.response as HttpResponse);
  }
  @then('Expecting Multiple Http response subset')
  public HttpMultipleResponseSubsetAssertion(): void {
    if (!Validator.Var(ScenarioClass.MultiHttp)) return;
    for (let i = 0; i < ScenarioClass.MultiHttp.length; i++) {
      HttpAssertionLogic.SubSet(ResClass.MultiHttp[i], ScenarioClass.MultiHttp[i].response as HttpResponse);
    }
  }
  @then('Expecting Multiple Http response deeply equal')
  public HttpMultipleResponseDeeplyEqualAssertion(): void {
    if (!Validator.Var(ScenarioClass.MultiHttp)) return;
    for (let i = 0; i < ScenarioClass.MultiHttp.length; i++) {
      HttpAssertionLogic.DeepEqual(ResClass.MultiHttp[i], ScenarioClass.MultiHttp[i].response as HttpResponse);
    }
  }
  @then('Expecting Http response list')
  public HttpResponseAssertionList(): void {
    if (!ScenarioClass.Http) return;
    HttpAssertionLogic.List(ResClass.Http, ScenarioClass.Http.response as HttpListResponse);
  }
  @then('Expect Http response model')
  public HttpModelAssertion(): void {
    if (!ScenarioClass.Http) return;
    HttpAssertionLogic.Model(ResClass.Http, ScenarioClass.Http.response as HttpResponse);
  }
  @then('Expect Error message equal to {string}')
  public HttpErrorMessageAssertion(errorMessage: string): void {
    if (!ScenarioClass.Http) return;
    expect(ResClass.Http.body.errorMessage).eql(VFormatter.Exec(errorMessage));
  }
  @then('Expect Http Status equal to {int}')
  public HttpStatusAssertion(status: number): void {
    if (!ResClass.Http) return;
    expect(ResClass.Http.status, `Http status`).eql(status);
  }
  @then('Expect Http Status not equal to {int}')
  public HttpNotStatusAssertion(status: number): void {
    if (!ResClass.Http) return;
    expect(ResClass.Http.status, `Http status`).not.eql(status);
  }
  @then('Expect message path {string} equal to {string}')
  @then('Expect Http responsePath {string} equal to {string}')
  @then('response path {string} == {string}')
  public HttpPathAssertion(path: string = '', expectValue: string): void {
    if (!ResClass.Http || !expectValue) return;
    AssertionLogic.Path(ResClass.Http.body, path, expectValue);
  }
  @then('response path {string} length to equal {string}')
  public HttpPathLengthAssertion(path: string = '', expectValue: string): void {
    if (!ResClass.Http) return;
    expect(StorageLogic.ObjPathVal(ResClass.Http.body, path).length, `${path} length`).eql(Number(expectValue));
  }
  @then('response path {string} contains {string}')
  public HttpPathContainsAssertion(path: string = '', expectValue: string): void {
    if (!ResClass.Http) return;
    AssertionLogic.PathContins(ResClass.Http.body, path, expectValue);
  }
  @then('response path {string} not contains {string}')
  public HttpPathNotContainsAssertion(path: string = '', expectValue: string): void {
    if (!ResClass.Http) return;
    AssertionLogic.PathNotContins(ResClass.Http.body, path, expectValue);
  }
  @then('response path {string} is member of {string}')
  public HttpPathIsMemberOfAssertion(path: string = '', expectValue: string): void {
    if (!ResClass.Http) return;
    const expValues = VFormatter.Exec(expectValue.split(','));
    const actValues = StorageLogic.ObjPathVal(ResClass.Http.body, path);
    expect(
      expValues.some((val: any) => CompLogic.Flag(actValues, val, 'equal')),
      `${path} value : ${actValues} is member of ${Obj.ToString(expValues)}`
    ).to.be.true;
  }
}
