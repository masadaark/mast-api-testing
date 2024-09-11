import Formatter from '../../class/formatter.class';
import ScenarioClass from '../../class/scenario.class';
import TcClass from '../../class/test_cases.class';
import { HttpFile } from '../../interface/file_interface/http_file.model';
import HttpProtocol from '../../protocol/http.protocol';
import File from '../../util/file.util';
import Obj from '../../util/object.util';
import Validator from '../validator.logic';

class HttpLogic {
    private static initApiPath(): string {
        let apiPath: string = TcClass.HttpFile?.apiPath as string
        if (ScenarioClass.Http.paramReplace) {
            apiPath = Formatter.PathReplace(apiPath,
                Formatter.Exec(ScenarioClass.Http.paramReplace))
        }
        if (Validator.Var(ScenarioClass.Http.request?.query)) {
            apiPath = `${apiPath}?${HttpProtocol.ObjToQueries(Formatter.Exec(ScenarioClass.Http.request.query))}`
        }
        return apiPath
    }
    static async RequestJsonFile(file: string): Promise<void> {
        const filePath = `payloads/${TcClass.feature}/${file}`.replace("//", "")
        const httpFile: HttpFile = await File.readJson(filePath)
        TcClass.HttpFile = httpFile
        ScenarioClass.Http = ScenarioClass.NewHttp()
        ScenarioClass.Http = Obj.New(Obj.FindInclude(httpFile.scenarios, "tcNo", TcClass.tcNo))
        if (!Validator.Var(ScenarioClass.Http)) return
        const request = ScenarioClass.Http.request
        await HttpProtocol.REQUEST(this.initApiPath(), TcClass.HttpFile.method, request?.headers, request?.body)
    }
}

export default HttpLogic