export const GValidate = (params: string)=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function(target: any, methodName: any, descriptor: any) {
        const oldMethod = descriptor.value;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = function(...args){
            (this.$refs[params] as HTMLFormElement).validate(async valid => {
                if(valid) {
                    oldMethod.apply(this, args)
                }else{
                return false
              }
            });
        }
        return descriptor
    }
}


import { MessageBox } from 'element-ui';

export function Confirmation(message) {
    return function(target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = function(...args) {
            MessageBox.confirm(message, '提示')
                .then(oldValue.bind(this, ...args))
                .catch(() => {});
        };

        return descriptor;
    }
}
@Confirmation('此操作将永久删除该文件, 是否继续?')
