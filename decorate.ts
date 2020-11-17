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

function Confirmation(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function(...args) {
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示')
            .then(oldValue.bind(this, ...args))
            .catch(() => {});
    };

    return descriptor;
}
