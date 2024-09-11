import { binding, when } from "cucumber-tsflow";
import TcClass from "../class/test_cases.class";
import StorageClass from "../class/storage.class";
import ScenarioClass from "../class/scenario.class";

@binding()
export class TestCasesController {
    @when("Feature {string} tcNo.{int}")
    public SetFeatureAndTcNumber(feature: string, tcNo: number): void {
        if(feature !== TcClass.feature && TcClass.feature !== "wiremock"){
            TcClass.reset()
            ScenarioClass.reset()
            StorageClass.reset()
            // WiremockClass.ClearMappingUUIDs()
        }
        TcClass.feature = feature
        TcClass.tcNo = tcNo
    }
}