/*
 * Copyright 2021 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

module_manifest!();

pub fn main() {}

const STRING1: &'static str = "Hello from: \n";
const STRING2: &'static str = " (char count: ";
const STRING3: &'static str = " chars)";
const STRING4: &'static str = "Hello back to you, \n";

#[marine]
pub struct HelloWorld {
    pub msg: String,
    pub reply: String,
}

#[marine]
pub fn hello(from: String) -> HelloWorld {
    
    let char_count = from.chars().count();
    let char_count1 = char_count + STRING1.chars().count();
    let char_count2 = char_count + STRING4.chars().count();
    
    HelloWorld {
        msg: format!("{}{}{}{}{}", STRING1, from, STRING2, char_count1, STRING3),
        reply: format!("{}{}{}{}{}", STRING4, from, STRING2, char_count2, STRING3),
    }
}


#[cfg(test)]
mod tests {
    use marine_rs_sdk_test::marine_test;

    #[marine_test(config_path = "../configs/Config.toml", modules_dir = "../artifacts")]
    fn non_empty_string(hello_world: marine_test_env::hello_world::ModuleInterface) {
        let actual = hello_world.hello("SuperNode".to_string());
        assert_eq!(actual.msg, "Hello from: \nSuperNode (char count: 22 chars)".to_string());
        assert_eq!(actual.reply, "Hello back to you, \nSuperNode (char count: 29 chars)".to_string());
        
    }

    #[marine_test(config_path = "../configs/Config.toml", modules_dir = "../artifacts")]
    fn empty_string(hello_world: marine_test_env::hello_world::ModuleInterface) {
        let actual = hello_world.hello("".to_string());
        assert_eq!(actual.msg, "Hello from: \n (char count: 13 chars)");
        assert_eq!(actual.reply, "Hello back to you, \n (char count: 20 chars)".to_string());
    }
}
